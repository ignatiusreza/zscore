# frozen_string_literal: true

# Detect Irregularities in a series of data based on the calculated moving z-score against a given threshold
#
class DetectIrregularitiesInteraction < ApplicationInteraction
  array :data do integer end
  float :threshold

  validates :threshold, numericality: { greater_than: 0 }

  def execute
    data.map { |entry, index|
      z_score(entry, data[0...index]).abs > threshold ? 1 : 0
    }
  end

  private

    # ref: https://m.wikihow.com/Calculate-Z-Scores
    def z_score(entry, prev_data)
      ((entry - average(prev_data)) / prev_data.standard_deviation)
    end

    def average(data)
      data.mean / data.length
    end
end
