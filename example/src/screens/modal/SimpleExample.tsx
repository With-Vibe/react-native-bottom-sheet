import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '../../components/button';
import ContactListContainer from '../../components/contactListContainer';
import withModalProvider from '../withModalProvider';

const SimpleExample = () => {
  const [top, setTop] = useState(false)
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleChange = useCallback((index: number) => {
    // eslint-disable-next-line no-console
    console.log('index', index);
  }, []);
  const handleDismiss = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('on dismiss');
  }, []);
  const handleDismissPress = useCallback(() => {
    bottomSheetRef.current!.dismiss();
  }, []);
  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current!.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    bottomSheetRef.current!.collapse();
  }, []);
  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current!.present();
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <Button
        label="Present Modal"
        style={styles.buttonContainer}
        onPress={handlePresentPress}
      />
      <Button
        label="Dismiss Modal"
        style={styles.buttonContainer}
        onPress={handleDismissPress}
      />
      <Button
        label="Expand"
        style={styles.buttonContainer}
        onPress={handleExpandPress}
      />
      <Button
        label="Collapse"
        style={styles.buttonContainer}
        onPress={handleCollapsePress}
      />
      <Button
        label={top ? 'top -> bottom' : 'bottom -> top'}
        onPress={() => setTop(top => !top)}
      />
      <View style={[styles.sheetContainer, top && styles.topContainer]} pointerEvents="box-none">
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          animationDuration={250}
          onDismiss={handleDismiss}
          onChange={handleChange}
        >
          <View style={[top && styles.topContentContainer]}>
            <ContactListContainer title="Modal FlatList" type="FlatList" />
          </View>
        </BottomSheetModal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  sheetContainer: {
    width: '112%',
    height: '100%',
    position: 'absolute',
    flexDirection: 'column',
  },
  topContainer: {
    transform: [{ rotate: '180deg' }],
  },
  topContentContainer: {
    transform: [{ rotate: '180deg' }],
  },
  buttonContainer: {
    marginBottom: 6,
  },
});

export default withModalProvider(SimpleExample);
