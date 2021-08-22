import { ColorProps } from '@shopify/restyle';
import React, { PureComponent } from 'react';
import { EasingFunction } from 'react-native';
import { Easing } from 'react-native';
import { Theme } from '../../../styles/theme';
import { Box, AnimatedBox } from '../Box';
import { Indicator, IndicatorProps, RenderFunction } from './Indicator';

const floatEpsilon = Math.pow(2, -23);

interface WaveIndicatorProps extends IndicatorProps {
  animationEasing?: EasingFunction;
  animationDuration?: number;
  waveFactor?: number;
  waveMode?: 'fill' | 'outline';
  color?: ColorProps<Theme>['color'];
  count?: number;
  size?: number;
}

export class WaveIndicator extends PureComponent<WaveIndicatorProps> {
  static defaultProps = {
    animationEasing: Easing.out(Easing.ease),
    animationDuration: 2100,
    waveFactor: 0.54,
    waveMode: 'fill',
    count: 4,
    size: 40,
  };

  constructor(props: WaveIndicatorProps) {
    super(props);
  }

  renderComponent: RenderFunction = ({ index, progress }) => {
    let {
      size = WaveIndicator.defaultProps.size,
      color = 'ash',
      waveFactor = WaveIndicator.defaultProps.waveFactor,
      waveMode,
    } = this.props;
    let fill = waveMode === 'fill';

    let factor = Math.max(1 - Math.pow(waveFactor, index), floatEpsilon);

    let waveStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      borderWidth: fill ? 0 : Math.floor(size / 20),

      transform: [
        {
          scale: progress.interpolate({
            inputRange: [factor, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        },
      ],

      opacity: progress.interpolate({
        inputRange: [0, factor, 1],
        outputRange: [0, 1, 0],
      }),
    };

    return (
      <Box justifyContent="center" alignItems="center" {...{ key: index }}>
        <AnimatedBox
          {...(fill ? { backgroundColor: color } : { borderColor: color })}
          style={waveStyle}
        />
      </Box>
    );
  };

  render() {
    let {
      size,
      animationEasing, // eslint-disable-line @typescript-eslint/no-unused-vars
      animationDuration, // eslint-disable-line @typescript-eslint/no-unused-vars
      waveFactor, // eslint-disable-line @typescript-eslint/no-unused-vars
      waveMode, // eslint-disable-line @typescript-eslint/no-unused-vars
      color, // eslint-disable-line @typescript-eslint/no-unused-vars
      ref, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...props
    } = this.props;

    return (
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        <Indicator
          flexDirection="row"
          justifyContent="space-between"
          width={size}
          height={size}
          renderComponent={this.renderComponent}
          {...props}
        />
      </Box>
    );
  }
}
