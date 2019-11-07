# frozen_string_literal: true

# Response to GET /
#
# Doesn't really do much, since frontend rendering is handled by webpack+react
#
class HomeController < ApplicationController
  def show; end
end
