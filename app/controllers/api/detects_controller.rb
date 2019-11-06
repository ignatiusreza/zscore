# frozen_string_literal: true

module Api
  # endpoint for /api/detect API request
  class DetectsController < Api::BaseController
    def create
      interaction = DetectIrregularitiesInteraction.run params

      respond_with interaction, location: api_detect_path
    end
  end
end
