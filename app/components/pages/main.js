import React from 'react';
import { Button, Card, Layout, Page, Text } from "@shopify/polaris";

export default function MainPage({ error, message, start, deleteProducts }) {

	return (
		<Page title="Auto-Store Demo">
			<Layout>
				{error && (
					<Layout.Section>
						<Text
							as="h3"
							variant="bodyLg"
							tone="critical"
						>
							{error}
						</Text>
					</Layout.Section>
				)}
				{message && (
					<Layout.Section>
						<Text
							as="h3"
							variant="bodyLg"
						>
							{message}
						</Text>
					</Layout.Section>
				)}
				<Layout.Section>
					<Card>
						<Button
							onClick={deleteProducts}>
							Delete All Products
						</Button>
					</Card>
				</Layout.Section>
				<Layout.Section>
					<Card>
						<Layout>
							<Layout.Section>
								<Button
									onClick={start}>
									Get Started
								</Button>
							</Layout.Section>
						</Layout>
					</Card>
				</Layout.Section>
			</Layout>
		</Page>
	);
};
