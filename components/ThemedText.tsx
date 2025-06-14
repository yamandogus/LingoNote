import { Text, TextProps, useColorScheme } from 'react-native';


export function ThemedText(props: TextProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? '#ffffff' : '#000000';

  return (
    <Text
      {...props}
      style={[
        {
          color: textColor,
        },
        props.style,
      ]}
    />
  );
} 