#!/bin/bash -e

version=$(grep '"version":' manifest.json | cut -d: -f2 | cut -d\" -f2)

rm -rf node_modules

# If you have npm production dependencies, uncomment the following line
# npm install --production

mkdir package
cp -r css images js views *.js manifest.json LICENSE README.md package/

# If you have npm production dependencies, uncomment the following line
# cp -r node_modules package/

cd package
find . \( -type f -o -type l \) -exec shasum --algorithm 256 {} \; >> SHA256SUMS
cd ..

TARFILE="example-extension-${version}.tgz"
tar czf ${TARFILE} package
shasum --algorithm 256 ${TARFILE} > ${TARFILE}.sha256sum

rm -rf package
