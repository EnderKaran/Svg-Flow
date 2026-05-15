import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const savedComponents = pgTable("saved_components", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  rawSvg: text("raw_svg").notNull(),
  optimizedTsx: text("optimized_tsx").notNull(),
  category: text("category").default("Icon").notNull(),
  isFavorite: boolean("is_favorite").default(false).notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});