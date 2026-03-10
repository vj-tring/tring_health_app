

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fonts, fontBold, fontRegular} from '../../constants/fonts';

// Define the state interface for the error boundary
type State = {
  hasError: boolean; // Flag indicating if an error has occurred
  error?: Error; // Optional error object containing error details
};

// CustomErrorBoundary class component for catching and handling React errors
class CustomErrorBoundary extends React.Component<
  {children: React.ReactNode}, // Props type: accepts children
  State // State type: error state
> {
  // Constructor to initialize the component state
  constructor(props: any) {
    super(props);
    this.state = {hasError: false}; // Initialize with no error
  }

  // Static lifecycle method called when an error occurs in a child component
  static getDerivedStateFromError(error: Error) {
    // Update state to indicate error and store error details
    return {hasError: true, error};
  }

  // Lifecycle method called after an error has been thrown
  componentDidCatch(error: Error, info: any) {
    // Here you can log the error to an error reporting service
    // Example: logErrorToService(error, info);
  }

  // Render method to display either error UI or children
  render() {
    if (this.state.hasError) {
      // Render error UI when an error has occurred
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong.</Text>
          <Text style={styles.error}>{this.state.error?.message}</Text>
        </View>
      );
    }
    // Render children normally when no error
    return this.props.children;
  }
}

// Styles for the error boundary component
const styles = StyleSheet.create({
  // Container styles for the error UI
  container: {
    flex: 1,
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    padding: 24, // Add padding around content
  },
  // Title text styles
  title: {
    fontSize: fonts.font18,
    fontFamily: fontBold,
    marginBottom: 8,
    color: '#dc2626', // Red color for error title
  },
  // Error message text styles
  error: {
    color: '#6b7280', // Gray color for error message
    fontSize: fonts.font14,
    fontFamily: fontRegular,
    textAlign: 'center', // Center align error message
  },
});

export default CustomErrorBoundary;
