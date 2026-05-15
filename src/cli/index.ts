#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import { optimize } from 'svgo';

const program = new Command();

program
  .name('svg-flow')
  .description('Batch convert SVGs to React (TSX) components')
  .version('1.0.0')
  .argument('<dir>', 'Directory containing SVG files')
  .option('-o, --out <dir>', 'Output directory for components', './components')
  .action(async (inputDir, options) => {
    try {
      const absoluteInputDir = path.resolve(process.cwd(), inputDir);
      const absoluteOutputDir = path.resolve(process.cwd(), options.out);

      // 1. SVG dosyalarını bul
      const svgFiles = await glob(`${absoluteInputDir}/**/*.svg`);

      if (svgFiles.length === 0) {
        console.error('❌ Hata: Klasörde SVG dosyası bulunamadı.');
        return;
      }

      console.log(`🚀 ${svgFiles.length} adet SVG bulundu. İşleniyor...`);

      // 2. Çıktı klasörünü oluştur
      await fs.ensureDir(absoluteOutputDir);

      for (const filePath of svgFiles) {
        const rawSvg = await fs.readFile(filePath, 'utf-8');
        const fileName = path.basename(filePath, '.svg');
        
        // Kebab-case'den PascalCase'e (icon-name -> IconName)
        const componentName = fileName
          .split(/[-_]/)
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join('') + 'Icon';

        // 3. SVGO Optimizasyonu
        const result = optimize(rawSvg, {
          multipass: true,
          plugins: ['preset-default', 'removeDimensions'],
        });

        // 4. TSX Template Oluşturma (Web'deki mantığın aynısı)
        const jsxSvg = result.data
          .replace(/stroke-width=/g, 'strokeWidth=')
          .replace(/stroke-linecap=/g, 'strokeLinecap=')
          .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
          .replace(/viewbox=/g, 'viewBox=');

        const tsxContent = `
import React from 'react';

export const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => (
  ${jsxSvg.replace('<svg', `<svg width={24} height={24} {...props}`)}
);

export default ${componentName};
`.trim();

        // 5. Dosyayı Yaz
        const outputFilePath = path.join(absoluteOutputDir, `${componentName}.tsx`);
        await fs.writeFile(outputFilePath, tsxContent);
        console.log(`✅ Oluşturuldu: ${componentName}.tsx`);
      }

      console.log('\n✨ İşlem başarıyla tamamlandı!');
    } catch (error) {
      console.error('❌ Kritik Hata:', error);
    }
  });

program.parse();