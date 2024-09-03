const fs=require('fs');
const path=require('path');
const crypto = require('crypto');
const zlib = require('zlib');
const sharp = require('sharp');

function init() {
    if (fs.existsSync('.pix')) {
        console.log('pixitory already initialized!');
        return;
    }
    fs.mkdirSync('.pix');
    const pixPath=process.cwd()+'/.pix';
    const structure = [
        { dir: '', files: [{ name: 'HEAD', content: 'ref: refs/heads/main\n' }] },
        { dir: 'branches', files: [] },
        { dir: 'objects', files: [] },
        { dir: 'refs/heads', files: [] },
        { dir: 'refs/tags', files: [] }
    ];
    structure.forEach(({dir, files}) => {
        const fullPath = path.join(pixPath, dir);
        fs.mkdirSync(fullPath, {recursive: true});
        files.forEach(({name, content}) => {
            fs.writeFileSync(path.join(fullPath, name), content);
        });
    });
    fs.writeFileSync(path.join(pixPath, 'config'), '[core]\n\trepositoryformatversion = 0\n\tbare = false\n');
    fs.writeFileSync(path.join(pixPath, 'index'), '');
    console.log('Initialized empty pixitory at', pixPath);
}

function add(filename) {
    const srcDir = `./${filename}`;
    const destDir = path.join("./.pix/objects", path.basename(filename));
    function errorHandler(err) {
        if (err) {
            console.log('Error moving file!', err);
        } else {
            console.log(`${filename} successfully added to .pix/objects/`);
        }
    }
    processMetadata(filename);
    fs.copyFile(srcDir, destDir, fs.constants.COPYFILE_EXCL, errorHandler);
}

function processMetadata(filename) {
    sharp(filename)
    .metadata()
    .then(metadata => {
        const EXIFdata = JSON.stringify(metadata);
        zlib.deflate(EXIFdata, (err, compressed) => {
            if (err) {
                console.error('Error compressing metadata:', err);
                return;
            }
            const hash = crypto.createHash('sha1').update(compressed).digest('hex');
            console.log("Generated Hash:", hash);
            const objectDir = path.join(".pix/objects", hash.substring(0, 2));
            const objectFile = path.join(objectDir, hash.substring(2));
            if (!fs.existsSync(objectDir)) {
                fs.mkdirSync(objectDir, { recursive: true });
            }
            fs.writeFileSync(objectFile, compressed);
            console.log(`Metadata stored at ${objectFile}`);
        });
    })
    .catch(err => {
        console.error('Error extracting metadata:', err);
    });
}

init();
add("sample.jpg");

function commit() {

}

function branch() {

}

//export {init, add, branch, commit}