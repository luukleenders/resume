import { Document, Font, Page, StyleSheet, View } from '@react-pdf/renderer';

import type { Education, Experience, Personal, Skill } from '@db/types';

import Main from './main';
import Sidebar from './sidebar';

interface LayoutProps {
  education: Education[];
  experience: Experience[];
  personal: Personal[];
  skills: Skill[];
}

Font.registerHyphenationCallback((word) => {
  return [word];
});

Font.register({
  family: 'Proxima Nova',
  src: `${process.env.BASE_URL}/fonts/proximaNova-light.ttf`,
  fontWeight: 300,
});

Font.register({
  family: 'Proxima Nova',
  src: `${process.env.BASE_URL}/fonts/proximaNova-semibold.ttf`,
  fontWeight: 600,
});

Font.register({
  family: 'Proxima Nova',
  src: `${process.env.BASE_URL}/fonts/proximaNova-extrabold.ttf`,
  fontWeight: 800,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    width: '210mm',
    height: '297mm',
    backgroundColor: '#ffffff',
    fontFamily: 'Proxima Nova',
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
});

export default function Layout({ education, experience, personal, skills }: LayoutProps) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.container}>
          <Sidebar education={education} personal={personal} skills={skills} />
          <Main experience={experience} />
        </View>
      </Page>
    </Document>
  );
}
