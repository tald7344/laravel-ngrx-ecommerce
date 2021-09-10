export interface Setting {
  id?: string;
  sitename_ar?: string;
  sitename_en?: string;
  logo?: string;
  icon?: string;
  email?: string;
  default_lang?: string;
  description?: string;
  keywords?: string;
  status?: 'open' | 'close';
  base_url?: string;
  message_maintenance?: string;
}
