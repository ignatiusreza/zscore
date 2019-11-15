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
    data.each.with_index.reduce([]) { |memo, (entry, index)|
      score = index >= window ? z_score(entry, prev_data(memo, index)).abs : 0
      memo << (score > threshold ? 1 : 0)
    }
  end

  private

    def prev_data(memo, index)
      data[0..index].select.with_index { |_, idx| index == idx || memo[idx].zero? }
    end

    # ref: https://m.wikihow.com/Calculate-Z-Scores
    def z_score(entry, prev_data)
      (entry - prev_data.mean) / prev_data.standard_deviation
    end
end
