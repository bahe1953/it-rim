import ComingSoon from './ComingSoon';
import { useLanguage } from '../i18n/LanguageContext';

export default function Raqib() {
  const { t } = useLanguage();
  const card = t.software.cards.find(c => c.name === 'RAQIB');
  return <ComingSoon name="RAQIB" tagline={card?.tagline || ''} />;
}
