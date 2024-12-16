import {defaultImage} from './default';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export function formatDateRelativeToNow(date) {
  const currentDate = new Date();
  const targetDate = new Date(date);
  const elapsedMilliseconds = currentDate - targetDate;

  if (elapsedMilliseconds < 1000) {
    return 'now';
  } else if (elapsedMilliseconds < 60 * 1000) {
    const seconds = Math.floor(elapsedMilliseconds / 1000);
    return `${seconds}s`;
  } else if (elapsedMilliseconds < 60 * 60 * 1000) {
    const minutes = Math.floor(elapsedMilliseconds / (60 * 1000));
    return `${minutes}min`;
  } else if (elapsedMilliseconds < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(elapsedMilliseconds / (60 * 60 * 1000));
    return `${hours}h`;
  } else {
    const weeks = Math.floor(elapsedMilliseconds / (7 * 24 * 60 * 60 * 1000));
    return `${weeks}w`;
  }
}

export const editDate = (dateToEdit, year) => {
  const d = new Date(dateToEdit);
  var datestring =
    d.toLocaleString('eng', {month: 'long'}).substring(0, 3) +
    ' ' +
    d.getDate() +
    (year ? ', ' + d.getFullYear() : '');
  return datestring;
};

export const truncateTitle = title => {
  const trimmedString = title.substr(0, 75);
  return trimmedString;
};

export const defaultImageFunc = userImage => {
  return `${userImage == null || userImage === '' ? defaultImage : userImage}`;
};

export const shareContent = async story => {
  const storyLink = 'https://mindfuel-web-fe.onrender.com/story/' + story.slug;
  const message = `Check out this story: ${story.title}\n\nRead more here: ${storyLink}`;
  const imageUrl = story.image;

  let shareOptions;

  if (imageUrl) {
    const filePath = `${RNFS.CachesDirectoryPath}/shared_image.jpg`;

    await RNFS.downloadFile({
      fromUrl: imageUrl,
      toFile: filePath,
    }).promise;

    shareOptions = {
      title: story.title,
      message: message,
      url: `file://${filePath}`,
      type: 'image/jpeg',
    };
  } else {
    shareOptions = {
      title: story.title,
      message: message,
      url: story.link,
    };
  }

  Share.open(shareOptions)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
};
