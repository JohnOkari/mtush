class Products < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :title
      t.string :description
      t.string :image
      t.string :price
      t.string :quantity
      t.string :cost      
      t.belongs_to :seller

      t.timestamps
    end
  end
end
