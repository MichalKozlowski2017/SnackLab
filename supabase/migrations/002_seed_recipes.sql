-- Seed data: Example ingredients
INSERT INTO ingredients (name, category) VALUES
  ('Kurczak', 'meat'),
  ('Pomidory', 'vegetables'),
  ('Cebula', 'vegetables'),
  ('Czosnek', 'vegetables'),
  ('Mozzarella', 'dairy'),
  ('Mąka', 'grains'),
  ('Jajka', 'dairy'),
  ('Mleko', 'dairy'),
  ('Sól', 'spices'),
  ('Pieprz', 'spices'),
  ('Oliwa z oliwek', 'other'),
  ('Ryż', 'grains'),
  ('Marchew', 'vegetables'),
  ('Brokuł', 'vegetables'),
  ('Ziemniaki', 'vegetables'),
  ('Masło', 'dairy'),
  ('Parmezan', 'dairy'),
  ('Makarony', 'grains'),
  ('Oregano', 'spices'),
  ('Bazylia', 'spices'),
  ('Papryka', 'spices'),
  ('Śmietana', 'dairy'),
  ('Zielona cebulka', 'vegetables'),
  ('Cytryna', 'fruits'),
  ('Łosoś', 'meat'),
  ('Krewetki', 'meat'),
  ('Białe wino', 'other'),
  ('Ser feta', 'dairy'),
  ('Oliwki', 'vegetables'),
  ('Szpinak', 'vegetables')
ON CONFLICT (name) DO NOTHING;

-- Seed data: Example recipes
INSERT INTO recipes (title, description, steps, prep_time, difficulty, is_ai_generated)
VALUES
  (
    'Kurczak Piccata',
    'Delikatna pierś kurczaka w sosie cytrynowym. Szybkie danie idealne na obiad.',
    ARRAY[
      'Przyrządź składniki - kurczak, cytryny, sól, pieprz',
      'Smażyć kurczaka na rozgrzanej patelni z masłem przez 3-4 minuty z każdej strony',
      'Usunąć kurczaka i przygotwać sos z cytryny, wody i oliwy',
      'Dodać kurczaka z powrotem i gotować przez 2-3 minuty',
      'Podawać gorące z ryżem lub makaronem'
    ],
    25,
    'easy',
    false
  ),
  (
    'Pasta alla Carbonara',
    'Klasyczny włoski makaron z bekonem, jajkami i parmezanem.',
    ARRAY[
      'Gotować makaron w osolonej wodzie do al dente',
      'Smażyć pokrój mięso na patelni do zrunienięcia',
      'Ubić jajka z parmezanem i solą',
      'Odcedzić makaron, zostawiając trochę wody gotowania',
      'Szybko wymieszać makaron z mięsem, następnie z mieszanką jajek',
      'Podawać natychmiast z dodatkowymi przyprawami'
    ],
    20,
    'easy',
    false
  ),
  (
    'Przepis na Paellę',
    'Tradycyjne hiszpańskie danie z ryżem, owocami morza i warzywami.',
    ARRAY[
      'Przygotować składniki - ryż, owoce morza, warzywa',
      'Smażyć cebulę w oliwie przez 2 minuty',
      'Dodać czosnek i ryż, mieszać przez 2 minuty',
      'Wlać bulion i gotować przez 15-18 minut',
      'Dodać owoce morza i warzywa w ostatnich 5 minutach',
      'Zostawić na patelni bez przykrycia przez 2 minuty do zarumienienia'
    ],
    35,
    'medium',
    false
  ),
  (
    'Łosoś pieczu z warzywami',
    'Wspaniałe danie z łososiem pieczonym w piekarniku ze świeżymi warzywami.',
    ARRAY[
      'Przygotować blaszkę do pieczenia i wyłożyć papierem pergaminowym',
      'Ułożyć łososia i warzywa na blasze',
      'Skropić oliwą, osolić i popieprzyć do smaku',
      'Wstawić do piekarnika w temperaturze 200°C na 15-20 minut',
      'Łosoś powinien być różowy i łatwo się rozpadać',
      'Podawać gorące z cytryna'
    ],
    30,
    'easy',
    false
  ),
  (
    'Kurczak tandoori',
    'Pikantne indyjskie danie z marynowanym kurczakiem.',
    ARRAY[
      'Przygotować marinę z jogurtu, curry i przypraw',
      'Marinować kurczaka przez co najmniej 2 godziny (lepiej przez noc)',
      'Smażyć na patelni lub w piekarniku w 200°C przez 25-30 minut',
      'Kurczak powinien być dobrze usmażony i złoty',
      'Podawać z ryżem i sosem jogurtowym'
    ],
    240,
    'medium',
    false
  ),
  (
    'Risotto z grzybami',
    'Kremowe włoskie danie z ryżem i grzybami leśnymi.',
    ARRAY[
      'Smażyć cebulę w maśle przez 2 minuty',
      'Dodać ryż i mieszać przez 2 minuty',
      'Wlewać stopniowo bulion, mieszając często',
      'Gdy ryż będzie miękki, dodać grzyby i parmezan',
      'Gotować przez 18-20 minut aż do kremowego stanu',
      'Podawać gorące z dodatkowymi przyprawami'
    ],
    40,
    'medium',
    false
  ),
  (
    'Sałatka grecka',
    'Świeża i zdrowa sałatka z serem feta, oliwkami i pomidorami.',
    ARRAY[
      'Umyć warzywa',
      'Pokroić pomidory, ogórki i cebulę na kawałki',
      'Ułożyć na talerzu ser feta i oliwki',
      'Polać oliwą z oliwek i sokiem z cytryny',
      'Osolić, popieprzyć i ozdobić oregano',
      'Podawać na zimno'
    ],
    15,
    'easy',
    false
  ),
  (
    'Bigos myśliwski',
    'Tradycyjne polskie danie z mięsem i kapustą kiszoną.',
    ARRAY[
      'Przygotować składniki - mięso, kapusta kiszona, pomidory',
      'Pokroić mięso w kostkę',
      'Smażyć mięso na patelni do zbrązowienia się',
      'Dodać cebulę, czosnek i warzywa',
      'Dodać kapustę kiszoną i pomidory',
      'Dusić przez 1-2 godziny na małym ogniu',
      'Podawać gorące z pieczywem'
    ],
    130,
    'medium',
    false
  ),
  (
    'Pierniki na Boże Narodzenie',
    'Tradycyjne pierniki z przyprawami i polewą.',
    ARRAY[
      'Przygotować mąkę, cukier, jajka i przyprawy',
      'Wymieszać wszystkie suche składniki',
      'Dodać jajka i wymieszać dokładnie',
      'Wycinać kształty i ułożyć na blasze',
      'Piec w 180°C przez 10-12 minut',
      'Po ostudzeniu polać białą polewą'
    ],
    60,
    'medium',
    false
  ),
  (
    'Zupa pomidorowa',
    'Klasyczna zupa ze świeżych pomidorów idealna na jeśli.',
    ARRAY[
      'Pokroić cebulę i czosnek',
      'Smażyć na oliwie przez 2 minuty',
      'Dodać pomidory i bulion',
      'Gotować przez 15-20 minut',
      'Blendować do gładkości',
      'Dodać śmietanę i przyprawy',
      'Podawać gorące z chlebem'
    ],
    35,
    'easy',
    false
  ),
  (
    'Quiche warzywne',
    'Francuska tarta warzywna z jajkami i śmietaną.',
    ARRAY[
      'Przygotować ciasto do tarty',
      'Ułożyć ciasto w formie',
      'Przygotować mieszankę jajek, śmietany i warzyw',
      'Wlać do formy',
      'Piec w 190°C przez 30-35 minut',
      'Aż do złotego koloru i twardego środka',
      'Podawać ciepłe lub na zimno'
    ],
    50,
    'medium',
    false
  )
ON CONFLICT DO NOTHING;

-- Get the IDs of inserted recipes and ingredients for linking
-- Pasta alla Carbonara
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 400, 'g'
FROM recipes r, ingredients i
WHERE r.title = 'Pasta alla Carbonara' AND i.name = 'Makarony'
ON CONFLICT DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 200, 'g'
FROM recipes r, ingredients i
WHERE r.title = 'Pasta alla Carbonara' AND i.name = 'Kurczak'
ON CONFLICT DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 3, 'szt.'
FROM recipes r, ingredients i
WHERE r.title = 'Pasta alla Carbonara' AND i.name = 'Jajka'
ON CONFLICT DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 100, 'g'
FROM recipes r, ingredients i
WHERE r.title = 'Pasta alla Carbonara' AND i.name = 'Parmezan'
ON CONFLICT DO NOTHING;

-- Kurczak Piccata
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 400, 'g'
FROM recipes r, ingredients i
WHERE r.title = 'Kurczak Piccata' AND i.name = 'Kurczak'
ON CONFLICT DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 2, 'szt.'
FROM recipes r, ingredients i
WHERE r.title = 'Kurczak Piccata' AND i.name = 'Cytryna'
ON CONFLICT DO NOTHING;

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 50, 'g'
FROM recipes r, ingredients i
WHERE r.title = 'Kurczak Piccata' AND i.name = 'Masło'
ON CONFLICT DO NOTHING;

-- Paella (10 ingredients)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 300, 'g' FROM recipes r, ingredients i WHERE r.title = 'Przepis na Paellę' AND i.name = 'Ryż' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 200, 'g' FROM recipes r, ingredients i WHERE r.title = 'Przepis na Paellę' AND i.name = 'Krewetki' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 1, 'szt.' FROM recipes r, ingredients i WHERE r.title = 'Przepis na Paellę' AND i.name = 'Cebula' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 2, 'zęb.' FROM recipes r, ingredients i WHERE r.title = 'Przepis na Paellę' AND i.name = 'Czosnek' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 1, 'opakowanie' FROM recipes r, ingredients i WHERE r.title = 'Przepis na Paellę' AND i.name = 'Brokuł' ON CONFLICT DO NOTHING;

-- Łosoś pieczony
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 400, 'g' FROM recipes r, ingredients i WHERE r.title = 'Łosoś pieczu z warzywami' AND i.name = 'Łosoś' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 200, 'g' FROM recipes r, ingredients i WHERE r.title = 'Łosoś pieczu z warzywami' AND i.name = 'Marchew' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 200, 'g' FROM recipes r, ingredients i WHERE r.title = 'Łosoś pieczu z warzywami' AND i.name = 'Brokuł' ON CONFLICT DO NOTHING;

-- Sałatka grecka
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 300, 'g' FROM recipes r, ingredients i WHERE r.title = 'Sałatka grecka' AND i.name = 'Pomidory' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 200, 'g' FROM recipes r, ingredients i WHERE r.title = 'Sałatka grecka' AND i.name = 'Ser feta' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 100, 'g' FROM recipes r, ingredients i WHERE r.title = 'Sałatka grecka' AND i.name = 'Oliwki' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 100, 'ml' FROM recipes r, ingredients i WHERE r.title = 'Sałatka grecka' AND i.name = 'Oliwa z oliwek' ON CONFLICT DO NOTHING;

-- Zupa pomidorowa
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 800, 'g' FROM recipes r, ingredients i WHERE r.title = 'Zupa pomidorowa' AND i.name = 'Pomidory' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 1, 'szt.' FROM recipes r, ingredients i WHERE r.title = 'Zupa pomidorowa' AND i.name = 'Cebula' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 100, 'ml' FROM recipes r, ingredients i WHERE r.title = 'Zupa pomidorowa' AND i.name = 'Śmietana' ON CONFLICT DO NOTHING;

-- Bigos myśliwski
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 500, 'g' FROM recipes r, ingredients i WHERE r.title = 'Bigos myśliwski' AND i.name = 'Kurczak' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 500, 'g' FROM recipes r, ingredients i WHERE r.title = 'Bigos myśliwski' AND i.name = 'Szpinak' ON CONFLICT DO NOTHING;
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit)
SELECT r.id, i.id, 400, 'g' FROM recipes r, ingredients i WHERE r.title = 'Bigos myśliwski' AND i.name = 'Pomidory' ON CONFLICT DO NOTHING;
