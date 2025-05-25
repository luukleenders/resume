import { Image as PDFImage, StyleSheet, Text, View } from '@react-pdf/renderer';

import { slate } from '../colors';

import type { Experience } from '@db/types';

import Title from './title';

interface MainProps {
  experience: Experience[];
}

const styles = StyleSheet.create({
  mainContent: {
    width: '145mm',
    height: '100%',
    paddingLeft: '5mm',
    paddingRight: '5mm',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '45mm',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default function Main({ experience }: MainProps) {
  return (
    <View style={styles.mainContent}>
      <View style={styles.titleContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '-10mm',
            fontSize: 32,
          }}
        >
          <Text style={{ fontWeight: 600 }}>curriculum</Text>
          <Text style={{ fontWeight: 300 }}>vitae</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', fontSize: 50 }}>
          <Text style={{ fontWeight: 300 }}>luuk</Text>
          <Text style={{ fontWeight: 600 }}>leenders</Text>
        </View>
      </View>

      <Title>Work Experience</Title>

      <View style={{ display: 'flex', flexDirection: 'column', gap: '5mm' }}>
        {experience.map((item) => (
          <View key={item.id}>
            <Text
              style={{
                display: 'flex',
                fontSize: 8,
                flexDirection: 'row',
                alignItems: 'center',
                color: slate['500'],
              }}
            >
              <PDFImage
                style={{ width: '1.8mm', height: '1.8mm' }}
                src={`${process.env.BASE_URL}/bullet.png`}
              />{' '}
              <Text style={{ fontWeight: 600 }}>{item.period} | </Text>
              <Text style={{ fontWeight: 300 }}>
                {item.location} - {item.url}
              </Text>
            </Text>

            <Text style={{ fontSize: 12, marginTop: '-1mm', fontWeight: 600, color: slate['900'] }}>
              {item.position} @ {item.company}
            </Text>

            <View
              style={{
                marginTop: '-1mm',
                display: 'flex',
                flexDirection: 'row',
                color: slate['900'],
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: 600 }}>Tech Stack: </Text>
              <Text style={{ fontSize: 10, fontWeight: 300 }}>{item.techstack.join(', ')}</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column' }}>
              {item.bullets.map((bullet) => (
                <Text key={bullet} style={{ fontSize: 10, fontWeight: 300, lineHeight: 1.2 }}>
                  • {bullet}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
