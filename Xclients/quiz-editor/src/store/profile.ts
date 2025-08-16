import { defineStore } from 'pinia';
import { api } from '@/api';
import { type Profile } from '@/type/profile';
import { type FetchProfileResponse } from '@/api/profile/fetch-profile'
import { type UploadProfileImageResponse } from '@/api/profile/upload-profile-image';
import { type UpdateProfileResponse } from '@/api/profile/update-profile';

interface ProfileState {
  profile: Profile | undefined,
  loading: boolean,
}

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    profile: undefined,
    loading: false,
  }),
  actions: {
    setProfile(profile: Profile) {
      this.profile = profile;
    },
    clearUser() {
      this.profile = undefined;
    },
    async fetchProfile(): Promise<FetchProfileResponse> {
      this.loading = true;
      return new Promise((resolve, reject) => {
        api.fetchProfile()
          .then((response) => {
            this.setProfile(response.profile);

            resolve(response);
          }).catch((error) => reject(error))
          .finally(() => {
            this.loading = false;
          });
      });
    },
    async updateProfile(profile: Partial<Profile>): Promise<UpdateProfileResponse> {
      this.loading = true;
      return new Promise((resolve, reject) => {
        api.updateProfile({ profile })
          .then((response) => {
            if (this.profile) {
              this.profile = response.profile;
            }

            resolve(response);
          }).catch((error) => reject(error))
          .finally(() => {
            this.loading = false;
          });
      });
    },
    async updateProfileImage(files: FileList | undefined): Promise<UploadProfileImageResponse> {
      this.loading = true;
      return new Promise((resolve, reject) => {
        api.uploadProfileImage({ files })
          .then((response) => {
            if (this.profile) {
              this.profile.imageUrl = response.imageUrl;
            }

            resolve(response);
          }).catch((error) => reject(error))
          .finally(() => {
            this.loading = false;
          });
      });
    }
  },
});