import ComingSoon from './ComingSoon';
import { useLanguage } from '../i18n/LanguageContext';

export default function EnterpriseSolutions() {
  const { t } = useLanguage();
  return <ComingSoon name={t.enterprise.title} tagline={t.enterprise.tagline} />;
}
