import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';
import ReactNativeBlobUtil from 'react-native-blob-util'


import Ionicons from 'react-native-vector-icons/Ionicons';

//

const {width, height} = Dimensions.get('screen');

// import screen
import BottomOption from './BottomOption/BottomOption';

export default function HomeScreen({route}) {
  const [isBottomMenuShown, setIsBottomMenuShown] = useState(false);
  //

  const {params} = route;
  let {dirs} = ReactNativeBlobUtil.fs;

  const wallartDirPath = `${dirs.SDCardDir}/wallart`;
  

  const getImageName = () => {
    const index = params.url.lastIndexOf('/');

    const name = params.url.slice(index + 1);
console.log('IMG:', params.url)
    return name;
  };


//

const downloadImage = () => {
  // Main function to download the image
  
  // To add the time suffix in filename
  let date = new Date();
  // Image URL which we want to download
  let image_URL = params.url;    
  // Getting the extention of the file
  let ext = getExtention(image_URL);
  ext = '.' + ext[0];
  // Get config and fs from RNFetchBlob
  // config: To pass the downloading related options
  // fs: Directory path where we want our image to download
  const { config, fs } = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      // Related to the Android only
      useDownloadManager: true,
      notification: true,
      path:
        PictureDir +
        '/image_' + 
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
      description: 'Image',
    },
  };
  config(options)
    .fetch('GET', params.url)
    .then(res => {
      // Showing alert after successful downloading
      console.log('res -> ', JSON.stringify(res));
      alert('Image Downloaded Successfully.');
    });
};

const getExtention = filename => {
  // To get the file extension
  return /[.]/.exec(filename) ?
           /[^.]+$/.exec(filename) : undefined;
};



//
  const downloadImg = async () => {
    try {
      const imgName = getImageName();

      await requestStoragePermission();
      await makeDir();

      ToastAndroid.show('Downloading...', ToastAndroid.LONG);

      const download = await ReactNativeBlobUtil.config({
        path: `${wallartDirPath}/${imgName}`, 
      }).fetch('GET', params.url);

      if (download.info().status == 200) {
        console.log('Download Complete');

        ToastAndroid.show('Download Done', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const makeDir = async () => {
    try {
      const isDirExists = await ReactNativeBlobUtil.fs.exists(wallartDirPath);

      if (!isDirExists) {
        await ReactNativeBlobUtil.fs.mkdir(wallartDirPath);
        console.log('dir created');
      } else {
        console.log('dir already exist');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: '',
          message: 'Storage',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={style.container}>
      <StatusBar backgroundColor={'#030318'} />

      <Image source={{uri: params.url}} style={style.backgroundImage} />

      <View
        style={[
          style.moreContainer,
          {opacity: 0.7, backgroundColor: '#030318'},
        ]}></View>

      <View style={style.moreContainer}>
        <TouchableOpacity style={style.button} onPress={() => downloadImage()}>
          <Ionicons name="download-outline" color={'#fff'} size={30} />
          <Text style={{color: '#fff'}}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.button}
          onPress={() => setIsBottomMenuShown(true)}>

          <Ionicons name="image-outline" color={'#fff'} size={30} />
          <Text style={{color: '#fff'}}>Set Wallpaper</Text>
        </TouchableOpacity>
      </View>

      {/* bottom sheet */}
      <BottomOption
        isBottomMenuShown={isBottomMenuShown}
        setIsBottomMenuShown={setIsBottomMenuShown}
        url={params.url}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#030318',
    backgroundColor: '#030318',
  },
  text: {
    color: '#fff',
  },
  backgroundImage: {
    height: height,
    width: width,
  },
  moreContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
  },
});
