# frozen_string_literal: true

require 'rails_helper'

describe HomeController do
  describe 'GET /' do
    before do get '/' end

    it do expect(response).to have_http_status(:ok) end

    it 'returns an empty container for react to mount to' do
      expect(response.body).to include('react-root')
    end
  end
end
