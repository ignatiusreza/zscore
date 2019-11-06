# frozen_string_literal: true

# rubocop:disable Style/Documentation
module Api
  class BaseController < ActionController::API
    respond_to :json
  end
end
# rubocop:enable Style/Documentation
