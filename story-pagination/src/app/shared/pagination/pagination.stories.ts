import type { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

const meta: Meta<PaginationComponent> = {
  component: PaginationComponent,
};

export default meta;

type Story = StoryObj<PaginationComponent>;

export const Default: Story = {
  args: {
    totalItems: 100,
    itemsPerPage: 10,
  },
};
