// Runs after "npx cap add android": adds mic permission, TTS/speech visibility, full-screen portrait-friendly settings.
import fs from 'node:fs';
const f = 'android/app/src/main/AndroidManifest.xml';
let x = fs.readFileSync(f, 'utf8');
const perms = ['android.permission.RECORD_AUDIO', 'android.permission.MODIFY_AUDIO_SETTINGS'];
let add = '';
for (const p of perms) if (!x.includes(p)) add += `    <uses-permission android:name="${p}" />\n`;
if (!x.includes('<queries>')) add += `    <queries>
        <intent><action android:name="android.speech.RecognitionService" /></intent>
        <intent><action android:name="android.intent.action.TTS_SERVICE" /></intent>
    </queries>\n`;
x = x.replace('</manifest>', add + '</manifest>');
if (!x.includes('windowSoftInputMode')) x = x.replace('<activity', '<activity android:windowSoftInputMode="adjustResize"');
fs.writeFileSync(f, x);
console.log('AndroidManifest patched');
