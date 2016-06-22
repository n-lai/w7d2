class Todo < ActiveRecord::Base
  validates :title, presence: true
  validates_inclusion_of :done, :in => [true, false]
end
