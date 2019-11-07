# frozen_string_literal: true

# Detect Irregularities in a series of data based on the calculated moving z-score against a given threshold
#
class DetectIrregularitiesInteraction < ApplicationInteraction
  array :data do integer end
  float :threshold
  float :window

  validates :threshold, numericality: { greater_than: 0 }
  validates :window, numericality: { greater_than: 0 }

  def execute
    data.map.with_index { |entry, index|
      score = index >= window ? z_score(entry, data[0..index]).abs : 0

      score > threshold ? 1 : 0
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
