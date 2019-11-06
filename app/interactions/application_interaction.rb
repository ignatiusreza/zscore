# frozen_string_literal: true

# rubocop:disable Style/Documentation
class ApplicationInteraction < ActiveInteraction::Base
  # required to make interaction compatible with `responders`
  #
  # when `respond_with interaction` is called with a valid resource,
  # `responders` will call `interaction.to_json` to generate the response
  #
  def to_json(options)
    { data: result }.to_json(options)
  end
end
# rubocop:enable Style/Documentation
