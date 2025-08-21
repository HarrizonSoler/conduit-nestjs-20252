import { defineConfig } from "@mikro-orm/core";

export default defineConfig({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    dbName: 'conduitdb',
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    debug: true
})