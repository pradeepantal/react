import VideoModal from '../model/video';
import videos from './video';

const ENABLE_RANDOM_ERRORS = false;

export default class VideosService {
  static getAll(): Promise<VideoModal[]> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (ENABLE_RANDOM_ERRORS && Math.random() > 0.5) {
            reject(new Error('Error'));
          } else {
            resolve(videos);
          }
        }, 1500);
      });
  }
}