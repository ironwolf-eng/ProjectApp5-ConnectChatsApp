const fs = require('fs');
const path = require('path');

const projectDir = './'; // raíz del proyecto
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const replacements = {
  welcome: 'Welcome',
  settings: 'Settings',
  preferences: 'Preferences',
  notifications: 'Notifications',
  enabled: 'Enabled',
  disabled: 'Disabled',
  language: 'Language',
  change: 'Change',
  theme: 'Theme',
  light: 'Light',
  dark: 'Dark',
  switch: 'Switch',
  currentLanguage: 'Current Language',
  currentTheme: 'Current Theme',
  save: 'Save',
  cancel: 'Cancel',
  profile: 'Profile',
  editProfile: 'Edit Profile',
  logout: 'Logout',
  chats: 'Chats',
  contacts: 'Contacts',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace i18n.t('key') calls
  Object.keys(replacements).forEach((key) => {
    const regex = new RegExp(`i18n\\.t\\(['"\`]${key}['"\`]\\)`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `'${replacements[key]}'`);
      modified = true;
    }
  });

  // Remove import i18n lines
  const importRegex = /^.*import\s+i18n\s+.*;.*$/gm;
  if (importRegex.test(content)) {
    content = content.replace(importRegex, '');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (extensions.includes(path.extname(fullPath))) {
      processFile(fullPath);
    }
  });
}

console.log('🚀 Starting i18n cleanup + import removal...');
walk(projectDir);
console.log('✅ Cleanup complete!');
