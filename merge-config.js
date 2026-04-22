const fs = require('fs');
const path = require('path');

// 读取主 package.json
const mainPackagePath = path.join(__dirname, 'package.json');
const electronPackagePath = path.join(__dirname, 'package-electron.json');

const mainPackage = JSON.parse(fs.readFileSync(mainPackagePath, 'utf8'));
const electronPackage = JSON.parse(fs.readFileSync(electronPackagePath, 'utf8'));

// 合并配置
const mergedPackage = {
  ...mainPackage,
  main: electronPackage.main,
  author: electronPackage.author,
  license: electronPackage.license
};

// 合并 scripts
mergedPackage.scripts = {
  ...mainPackage.scripts,
  ...electronPackage.scripts
};

// 合并 dependencies
mergedPackage.dependencies = {
  ...mainPackage.dependencies,
  ...electronPackage.dependencies
};

// 合并 devDependencies
mergedPackage.devDependencies = {
  ...mainPackage.devDependencies,
  ...electronPackage.devDependencies
};

// 添加 build 配置
mergedPackage.build = electronPackage.build;

// 写入合并后的 package.json
fs.writeFileSync(mainPackagePath, JSON.stringify(mergedPackage, null, 2));

console.log('✅ 已合并 Electron 配置到 package.json');
console.log('版本:', mergedPackage.version);
console.log('应用名称:', mergedPackage.build.productName);
