import { SettingCategories } from 'app/profile/enumerations/setting-categories.enum';

export interface UserSetting {
  settingCategory: SettingCategories;
  settings: string[];
}
