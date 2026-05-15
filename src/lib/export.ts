import JSZip from "jszip";
import { saveAs } from "file-saver";

interface ExportItem {
  name: string;
  optimizedTsx: string;
}

export const exportVaultAsZip = async (components: ExportItem[]) => {
  const zip = new JSZip();
  const iconFolder = zip.folder("icons");
  
  if (!iconFolder) return;

  let indexContent = "";

  components.forEach((item) => {
    // 1. Dosya ismini temizle ve .tsx ekle
    const fileName = `${item.name}.tsx`;
    
    // 2. İkon dosyasını klasöre ekle
    iconFolder.file(fileName, item.optimizedTsx);
    
    // 3. index.ts için export satırını hazırla
    indexContent += `export * from "./icons/${item.name}";\n`;
  });

  // 4. Ana dizine index.ts ekle
  zip.file("index.ts", indexContent);

  // 5. ZIP dosyasını oluştur ve indir
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `svg-flow-icons-${new Date().getTime()}.zip`);
};