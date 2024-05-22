# game-3-platformer
My submission for the Game 3 Platformer Assignment
# Game Name: Bitty
# Level Name: Bitty’s First Steps

# Components Programmed:
Player avatar movement: The player can move and jump

Ground and platforms, platforms allow collision only on the top of the tile, and ground collides on all sides

Collectible Item: The player can collect coins

End of Level Condition: The player can beat the game by colliding with the key at the end of the level or in the secret level unlocked by figuring out how to open a mysterious door.

Level Size: The level is well over 3 screens wide.

Scrolling and camera: The camera moves with the player and has a self implemented “lookahead system” so players can plan jumps more effectively.

Particle Juice: There is a particle system for jumping, collecting coins, and running that are all implemented using the Kenney Particle Pack with custom config objects.

Audio Juice: All audio in the game was created by me on my synthesizer. There are sounds for states of the game, as well as sound effects for walking, jumping and collecting coins.

JS & Phaser: This was made using JavaScript and Phaser

Arcade Physics: This game uses Phaser’s Arcade Physics

Scenes: This game has more than one Scene

Art Assets: All of the art in this game was made by Kenney in the “1-bit-pack” and the “font pack”. 

Game End: The game has a “Game Over” screen and a “You Win” screen with the option to restart.

Game Restart: After dying or beating the game you can restart the game from the associated menu.

# Optional Elements I believe I implemented:
Dynamic Level Elements: The player can access a hidden part of the level by collecting all the coins in the base level.

Secret Level: By touching the block in the room that unlocks when you collect all the coins, you teleport to the secret level and get a hefty reward along with beating the game.

Animated Level Elements: My level extensively uses animated tiles for additional juice.

Puzzles: The player has to figure out how to access the locked door to the hidden level by trying to get all of the coins in the level.

Ways for the player to die/be incapacitated: The level has an old-school arcade difficulty, meaning upon death you will have to restart the game. You can die by falling into spinning fans, or by falling into spikes.
