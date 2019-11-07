# frozen_string_literal: true

require 'rails_helper'

describe Api::DetectsController do
  describe 'POST /api/detect' do
    context 'when given valid data' do
      let(:expected) { %w[0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 1 1 0].map(&:to_i) }
      let(:params) {
        {
          threshold: 2,
          window: 7,
          data: %w[1 2 1 0 1 2 1 8 9 8 1 2 0 2 1 2 3 1 2 0 8 9 2],
        }
      }

      before do post '/api/detect', xhr: true, params: params end

      it do expect(response).to have_http_status(:created) end

      it 'returns the expected irregularities data' do
        expect(response.body).to be_json_eql(expected.to_json).at_path('data')
      end
    end

    context 'when given negative threshold' do
      let(:expected) {}
      let(:params) { { threshold: -2, window: 7, data: %w[1 2 1 0 1 2 1] } }

      before do post '/api/detect', xhr: true, params: params end

      it do expect(response).to have_http_status(:unprocessable_entity) end

      it 'returns the error message' do
        expect(response.body).to be_json_eql('must be greater than 0'.to_json).at_path('errors/threshold/0')
      end
    end

    context 'when given negative window' do
      let(:expected) {}
      let(:params) { { threshold: 2, window: -7, data: %w[1 2 1 0 1 2 1] } }

      before do post '/api/detect', xhr: true, params: params end

      it do expect(response).to have_http_status(:unprocessable_entity) end

      it 'returns the error message' do
        expect(response.body).to be_json_eql('must be greater than 0'.to_json).at_path('errors/window/0')
      end
    end
  end
end
