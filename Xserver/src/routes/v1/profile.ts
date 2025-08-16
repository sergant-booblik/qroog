import { Router } from 'express';
import { fetchMyProfile } from '@/controller/profile/fetch-my-profile';
import { updateMyProfile } from '@/controller/profile/update-my-profile';
import { uploadProfileImage } from '@/controller/profile/upload-profile-image';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: './.uploads/icon',
  filename(_, file, callback) {
    callback(null, Date.now() + '_' + file.originalname);
  },
});

const uploadImage = multer({ storage });

const profileRoutes = Router({ mergeParams: true });

profileRoutes.get('/my', fetchMyProfile);
profileRoutes.patch('/my', updateMyProfile);
profileRoutes.post('/my/image',uploadImage.single('file'),  uploadProfileImage);

export default profileRoutes;