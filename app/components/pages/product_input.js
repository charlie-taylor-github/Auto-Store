import { Page } from '@shopify/polaris';
import React from 'react';

export default function ProductInputPage({ goBack }) {
  return (
    <Page
      title="Enter Details About Your Product"
      backAction={{
        onAction: goBack
      }}
    >
    </Page>
  );
}
