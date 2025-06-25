import { defineStore } from 'pinia';
import { api } from '@/api';
import { type Profile } from '@/type/profile.ts';
import { type FetchProfileResponse } from '@/api/profile/fetch-profile.ts'

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
  },
});