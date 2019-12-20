// Libraries
import React, { PureComponent } from 'react';

// Services & Utils
import { config } from 'app/core/config';

import { BarGauge, VizRepeater, DataLinksContextMenu } from '@grafana/ui';
import { BarGaugeOptions } from './types';
import {
  getFieldDisplayValues,
  FieldDisplay,
  PanelProps,
  getDisplayValueAlignmentFactors,
  DisplayValueAlignmentFactors,
  ScaleMode,
} from '@grafana/data';
import { getFieldLinksSupplier } from 'app/features/panel/panellinks/linkSuppliers';

export class BarGaugePanel extends PureComponent<PanelProps<BarGaugeOptions>> {
  renderValue = (
    value: FieldDisplay,
    width: number,
    height: number,
    alignmentFactors: DisplayValueAlignmentFactors
  ): JSX.Element => {
    const { options } = this.props;
    const { field, display, view, colIndex } = value;
    const f = view.dataFrame.fields[colIndex];

    // When not absolute, use percent display
    let min = field.min;
    let max = field.max;
    if (field.scale.mode !== ScaleMode.absolute) {
      min = 0;
      max = 100;
      display.numeric = display.percent * 100;
    }

    return (
      <DataLinksContextMenu links={getFieldLinksSupplier(value)}>
        {({ openMenu, targetClassName }) => {
          return (
            <BarGauge
              value={display}
              width={width}
              height={height}
              orientation={options.orientation}
              scale={field.scale}
              display={f.display!}
              theme={config.theme}
              itemSpacing={this.getItemSpacing()}
              displayMode={options.displayMode}
              minValue={min}
              maxValue={max}
              onClick={openMenu}
              className={targetClassName}
              alignmentFactors={alignmentFactors}
            />
          );
        }}
      </DataLinksContextMenu>
    );
  };

  getValues = (): FieldDisplay[] => {
    const { data, options, replaceVariables } = this.props;
    return getFieldDisplayValues({
      ...options,
      replaceVariables,
      theme: config.theme,
      data: data.series,
      autoMinMax: true,
    });
  };

  getItemSpacing(): number {
    if (this.props.options.displayMode === 'lcd') {
      return 2;
    }

    return 10;
  }

  render() {
    const { height, width, options, data, renderCounter } = this.props;

    return (
      <VizRepeater
        source={data}
        getAlignmentFactors={getDisplayValueAlignmentFactors}
        getValues={this.getValues}
        renderValue={this.renderValue}
        renderCounter={renderCounter}
        width={width}
        height={height}
        itemSpacing={this.getItemSpacing()}
        orientation={options.orientation}
      />
    );
  }
}
