import ComingSoon from './ComingSoon';
import { useLanguage } from '../i18n/LanguageContext';

export default function Waqood() {
  const { t } = useLanguage();
  const card = t.software.cards.find(c => c.name === 'Waqood');
  return <ComingSoon name="Waqood" tagline={card?.tagline || ''} />;
}
