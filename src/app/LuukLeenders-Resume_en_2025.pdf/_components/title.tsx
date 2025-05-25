import { StyleSheet, Text } from '@react-pdf/renderer';

import { slate } from '../colors';

interface TitleProps {
  children: React.ReactNode;
  style?: Record<string, string>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 800,
    color: slate['900'],
  },
});

export default function Title({ children, style = {} }: TitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}
