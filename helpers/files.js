import * as FileSystem from 'expo-file-system';
import { supabase } from '../config/supabaseConfig';
import { decode } from 'base64-arraybuffer';

export const uploadImage = async (uri) => {
    let fileName = uri.split('/').pop();
    const contentType = `image/${fileName.split('.').pop()}`;

    // Generate a unique string - using a timestamp here for simplicity
    const uniqueString = new Date().getTime().toString(36) + Math.random().toString(36).substr(2, 9);

    // Append the unique string to the fileName (before the file extension)
    fileName = fileName.replace(/(\.[\w\d_-]+)$/i, `_${uniqueString}$1`);

    console.log(uri);

    const base64string = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

    // Decode the base64 string to an ArrayBuffer
    const arrayBuffer = decode(base64string);

    // Log the ArrayBuffer size to check if it's not empty
    console.log(arrayBuffer.byteLength);

    let { data, error } = await supabase.storage
        .from('pfp')
        .upload(`${fileName}`, arrayBuffer, {
            contentType,
        });

    if (error) {
        throw new Error('Error uploading image: ' + error.message);
    }

    return data.path; // Return the key of the uploaded file
};
