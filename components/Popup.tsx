import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  button1Text?: string;
  button2Text?: string;
  button1Action?: () => void;
  button2Action?: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export const Popup: React.FC<PopupProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  button1Text,
  button2Text,
  button1Action,
  button2Action,
  type = 'info'
}) => {
  const getPopupStyle = () => {
    switch (type) {
      case 'success':
        return { borderColor: '#4CAF50', icon: '✓', titleColor: '#4CAF50' };
      case 'error':
        return { borderColor: '#f44336', icon: '✕', titleColor: '#f44336' };
      case 'warning':
        return { borderColor: '#ff9800', icon: '⚠', titleColor: '#ff9800' };
      default:
        return { borderColor: '#2196F3', icon: 'ℹ', titleColor: '#2196F3' };
    }
  };

  const getButtonStyle = (isPrimary: boolean) => {
    const style = getPopupStyle();
    if (isPrimary) {
      return {
        backgroundColor: style.borderColor,
        borderColor: style.borderColor,
      };
    }
    return {
      backgroundColor: '#333',
      borderColor: '#555',
    };
  };

  const popupStyle = getPopupStyle();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={20} style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
        <View style={{
          backgroundColor: '#1a1a1a',
          borderRadius: 15,
          padding: 24,
          width: '100%',
          maxWidth: 320,
          borderWidth: 1,
          borderColor: popupStyle.borderColor,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: popupStyle.titleColor,
            marginBottom: 12,
            textAlign: 'center',
          }}>
            {popupStyle.icon} {title}
          </Text>
          
          {subtitle && (
            <Text style={{
              fontSize: 16,
              color: '#fff',
              marginBottom: 24,
              textAlign: 'center',
              lineHeight: 22,
            }}>
              {subtitle}
            </Text>
          )}

          <View style={{
            flexDirection: button2Text ? 'row' : 'column',
            gap: 12,
          }}>
            {button1Text && (
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderRadius: 10,
                  padding: 14,
                  alignItems: 'center',
                  borderWidth: 1,
                  ...getButtonStyle(true),
                }}
                onPress={button1Action || onClose}
              >
                <Text style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                  {button1Text}
                </Text>
              </TouchableOpacity>
            )}

            {button2Text && (
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderRadius: 10,
                  padding: 14,
                  alignItems: 'center',
                  borderWidth: 1,
                  ...getButtonStyle(false),
                }}
                onPress={button2Action || onClose}
              >
                <Text style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                  {button2Text}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

// Popup service for easy calling
class PopupService {
  private listeners: ((props: PopupProps | null) => void)[] = [];

  subscribe(listener: (props: PopupProps | null) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(props: PopupProps | null) {
    this.listeners.forEach(listener => listener(props));
  }

  show(
    title: string,
    subtitle?: string,
    button1Text?: string,
    button2Text?: string,
    button1Action?: () => void,
    button2Action?: () => void,
    type: 'success' | 'error' | 'warning' | 'info' = 'info'
  ) {
    const props: PopupProps = {
      visible: true,
      onClose: () => this.hide(),
      title,
      subtitle,
      button1Text,
      button2Text,
      button1Action,
      button2Action,
      type,
    };
    this.notifyListeners(props);
  }

  hide() {
    this.notifyListeners(null);
  }
}

export const popup = new PopupService();

// Global popup component that listens to the service
export const GlobalPopup: React.FC = () => {
  const [popupProps, setPopupProps] = useState<PopupProps | null>(null);

  React.useEffect(() => {
    const unsubscribe = popup.subscribe(setPopupProps);
    return unsubscribe;
  }, []);

  if (!popupProps) return null;

  return <Popup {...popupProps} />;
}; 