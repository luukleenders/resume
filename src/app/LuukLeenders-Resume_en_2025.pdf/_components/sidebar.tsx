import { Image as PDFImage, StyleSheet, Text, View } from '@react-pdf/renderer';

import { slate } from '../colors';

import type { Education, Personal, Skill } from '@db/types';

import Title from './title';

interface SidebarProps {
  education: Education[];
  personal: Personal[];
  skills: Skill[];
}

const styles = StyleSheet.create({
  sidebar: {
    flexDirection: 'column',
    minWidth: '65mm',
    width: '65mm',
    height: '100%',
    paddingLeft: '5mm',
    paddingRight: '5mm',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '5mm',
    backgroundColor: slate['200'],
  },
  pfp: {
    marginTop: '5mm',
    width: '35mm',
    height: '35mm',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  label: {
    fontSize: 10,
    fontWeight: 600,
    lineHeight: 1.2,
    color: slate['900'],
  },
  value: {
    fontSize: '10pt',
    fontWeight: 300,
    lineHeight: 1,
    color: slate['900'],
  },
  meta: {
    flexDirection: 'row',
    marginBottom: '-1mm',
  },
  metaLabel: {
    fontSize: 8,
    fontWeight: 600,
    lineHeight: 1.25,
    color: slate['900'],
  },
  metaValue: {
    fontSize: 8,
    fontWeight: 300,
    lineHeight: 1.25,
    color: slate['900'],
  },
  footnote: {
    fontSize: 8,
    fontWeight: 300,
    color: slate['900'],
  },
});

export default function Sidebar({ education, personal, skills }: SidebarProps) {
  return (
    <View style={styles.sidebar}>
      <PDFImage style={styles.pfp} src={`${process.env.BASE_URL}/pfp-coloured.png`} />

      <View style={{ display: 'flex', flexDirection: 'column', gap: '3mm' }}>
        <View style={{ display: 'flex', flexDirection: 'column', gap: '2mm' }}>
          <Title style={{ marginBottom: '-2mm' }}>Personal</Title>

          {personal.map((item) => (
            <View key={item.id}>
              <Text style={styles.label}>{item.key}</Text>
              <Text style={styles.value}>{item.value.replace(/^https?:\/\//, '')}</Text>
            </View>
          ))}
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', gap: '2mm' }}>
          <Title style={{ marginBottom: '-2mm' }}>Skills</Title>

          {skills.map((item) => (
            <View key={item.id}>
              <Text style={styles.label}>{item.category}</Text>
              <Text style={styles.value}>{item.items.join(', ')}</Text>
            </View>
          ))}
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', gap: '2mm' }}>
          <Title style={{ marginBottom: '-2mm' }}>Education</Title>

          {education.map((item) => (
            <View key={item.id}>
              <View style={styles.meta}>
                <Text style={styles.metaLabel}>{item.metaLabel} | </Text>
                <Text style={styles.metaValue}>{item.metaValue}</Text>
              </View>

              <Text style={styles.label}>{item.label}</Text>

              <Text style={styles.footnote}>{item.footnote}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
