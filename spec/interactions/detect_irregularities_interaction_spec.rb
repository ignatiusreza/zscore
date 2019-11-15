# frozen_string_literal: true

require 'rails_helper'

describe DetectIrregularitiesInteraction do
  {
    # rubocop:disable Metrics/LineLength
    {
      threshold: 2.5,
      window: 7,
      data: %w[1 2 1 0 1 2 1 8 9 8 1 2 0 2 1 2 3 1 2 0 8 9 2 0 3 0 2 1 2 3 8 10 2 1 2 3 0 1 2 1 2 7 6 9 1 2 0 1 2 1],
    } => %w[0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0],
    {
      threshold: 2,
      window: 5,
      data: %w[0 2 1 2 3 10 12 1 1 2 3 0 1 2 1 2 7 6 9 1 2 0 1 2 1 2 1 3 0 2 3 1 1 2 3 10 9 12 0 2 3 1 2 0 1 7 11 0 1 2],
    } => %w[0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 1 1 0 0 0],
    {
      threshold: 2,
      window: 5,
      data: %w[2 1 3 0 2 2 9 7 2 3 1 2 9 8 2 3 1 2 0 1 2 3 0 10 9 1 2 1 0 1 2 1 8 9 8 1 2 0 2 1 2 1 14 10 0 1 1 2 0 3],
    } => %w[0 0 0 0 0 0 1 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0],
    {
      threshold: 2,
      window: 5,
      data: %w[1 2 3 0 1 2 1 2 7 6 9 1 2 0 1 2 1],
    } =>    %w[0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0],
    {
      threshold: 2,
      window: 5,
      data: %w[1 2 3 0 1 2 1 2 7 6 9 1 2 0 1 2 1 10],
    } => %w[0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 1],
    # rubocop:enable Metrics/LineLength
  }.each do |input, output|
    it 'calculate the zscore of a series of integers' do
      expect(described_class.run!(input)).to eql(output.map(&:to_i))
    end
  end

  context 'when given invalid data' do
    subject(:interaction) { described_class.run(data: %w[1 2], threshold: -4, window: 5) }

    it do is_expected.not_to be_valid end

    it 'reports the error' do
      expect(interaction.errors.details).to include(:threshold)
    end
  end
end
