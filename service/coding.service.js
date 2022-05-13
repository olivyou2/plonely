/* eslint-disable no-restricted-syntax */
/* eslint-disable no-bitwise */
<<<<<<< HEAD
=======
/**
 *
 * @param {String} str
 */

// a b c d e f g h A B C D E F G H
>>>>>>> e604f348aec841e48904386637fe4b3e11111231

const codes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];

const key = Buffer.from('ObMwnXZ');
const keyLength = key.byteLength;

<<<<<<< HEAD
/**
 *
 * @param {String} str
 */
=======
>>>>>>> e604f348aec841e48904386637fe4b3e11111231
const endecrypt = (str) => {
  const buffer = Buffer.from(str);
  const newBuffer = Buffer.alloc(buffer.byteLength);
  let offset = 0;

  while (offset !== buffer.byteLength) {
    const thisByte = buffer.readUint8(offset);
    const keyByte = key.readUint8(offset % keyLength);

    newBuffer.writeUInt8(thisByte ^ keyByte, offset);
    offset += 1;
  }

  return newBuffer.toString();
};

const encoding = (origin) => {
  const str = endecrypt(origin);
  // const str = origin;

  let coded = '';
  const buffer = Buffer.from(str);
  let offset = 0;

  while (offset !== buffer.length) {
    const byte = buffer.readUInt8(offset);
    offset += 1;

    const down = (byte & (0xf));
    const upper = (byte & (0xf0)) >> 4;

    coded += codes[upper] + codes[down];
  }

  return coded;
};

/**
 *
 * @param {string} str
 */
const decoding = (str) => {
  const buffer = Buffer.alloc(str.length / 2);

  for (let i = 0; i < str.length; i += 2) {
    const upper = codes.findIndex((c) => c === str[i]);
    const down = codes.findIndex((c) => c === str[i + 1]);

    buffer.writeUint8((upper << 4) + down, i / 2);
  }

  const decryption = endecrypt(buffer.toString());

  return decryption;
};

module.exports = {
  endecrypt,
  encoding,
  decoding,
};
