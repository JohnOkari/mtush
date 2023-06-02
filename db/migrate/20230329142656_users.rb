class Users < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :type
      t.string :username
      t.string :password_digest
      t.string :name

      t.timestamps
    end
  end
end
