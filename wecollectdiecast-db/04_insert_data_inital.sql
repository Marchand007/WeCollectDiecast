INSERT INTO
    business(
        "name",
        phone_number,
        email,
        address_number,
        address_unit,
        address_street,
        address_city,
        address_state,
        address_country,
        address_postal_code,
        monday_open_time,
        monday_close_time,
        tuesday_open_time,
        tuesday_close_time,
        wednesday_open_time,
        wednesday_close_time,
        thursday_open_time,
        thursday_close_time,
        friday_open_time,
        friday_close_time,
        saturday_open_time,
        saturday_close_time,
        sunday_open_time,
        sunday_close_time,
        facebook_link,
        x_link,
        instagram_link,
        tiktok_link
    )
VALUES
    (
        'Kinésens',
        '514-267-1857',
        'wecollectdiecast@gmail.com',
        '1360',
        null,
        'Rue King Ouest',
        'Sherbrooke',
        'Quebec',
        'Canada',
        'J1J 2B8',
        '9:00',
        '18:00',
        '10:00',
        '21:00',
        '9:00',
        '18:00',
        '9:00',
        '21:00',
        '9:00',
        '17:00',
        '10:00',
        '14:00',
        null,
        null,
        'www.facebook.com',
        'www.twitter.com',
        'www.instagram.com',
        'www.tiktok.com'
    );

INSERT INTO
    "service" (
        "name",
        minutes_duration,
        "description",
        price,
        is_active
    )
VALUES
    (
        'Le Suedois',
        60,
        'Description d''un massage suedois',
        90.00,
        true
    ),
    (
        'Le Suedois',
        90,
        'Description d''un massage suedois',
        120.00,
        true
    ),
    (
        'Le Sportif',
        60,
        'Description d''un massage Sportif',
        90.00,
        true
    ),
    (
        'Le Sportif',
        90,
        'Description d''un massage Sportif',
        120.00,
        true
    );

INSERT INTO
    appointment_status("name")
VALUES
    ('Confirmé'),
    ('Annulé par client'),
    ('Annulé par spécialiste'),
    ('No show');

INSERT INTO
    professional_title("name")
VALUES
    ('Massothérapeutre'),
    ('Masso-Kinéthérapeutre'),
    ('Orthothérapeutre'),
    ('Kinéthérapeutre');

INSERT INTO
    contact_preference("name")
VALUES
    ('Courriel'),
    ('Sms');

INSERT INTO
    employee(
        first_name,
        last_name,
        email,
        phone_number,
        phone_type,
        professional_number,
        is_admin,
        is_active,
        password_hash,
        password_salt,
        password_lost,
        contact_preference,
        is_new_employee,
        profile_picture,
        profile_picture_type
    )
VALUES
    (
        'Maxime',
        'Marchand',
        'm.marchand22@hotmail.com',
        '819-434-3205',
        'Mobile',
        '0',
        true,
        true,
        '3KcoXaTITQ1mdSHo4EC6EW6oqSfYypBhioQH85sEdhgeXkm+i49YHg/rVnN+0jtR7r3noSqBBwvnzKFwZPKREA==',
        'nPRDyRkoQzfNQp0B8fPkGQ==',
        false,
        'Courriel',
        false,
        null,
        null
    );

INSERT INTO
    client(
        first_name,
        last_name,
        email,
        phone_number,
        phone_type,
        address_number,
        address_unit,
        address_street,
        address_city,
        address_state,
        address_country,
        address_postal_code,
        want_newsletter,
        contact_preference,
        is_active,
        password_hash,
        password_salt,
        password_lost
    )
VALUES
    (
        'Maxime',
        'Marchand',
        'dawalk@live.ca',
        '819-434-3205',
        'Mobile',
        '4347',
        '1',
        'rue pavillon',
        'Sherbrooke',
        'Quebec',
        'Canada',
        'J1N3C1',
        false,
        'Courriel',
        true,
        '3KcoXaTITQ1mdSHo4EC6EW6oqSfYypBhioQH85sEdhgeXkm+i49YHg/rVnN+0jtR7r3noSqBBwvnzKFwZPKREA==',
        'nPRDyRkoQzfNQp0B8fPkGQ==',
        false
    );

INSERT INTO
    employee_professional_title(employee_id, professional_title_name)
VALUES
    (1, 'Massothérapeutre'),
    (1, 'Kinéthérapeutre');

INSERT INTO
    employee_service(employee_id, service_id)
VALUES
    (1, 1),
    (1, 2);

INSERT INTO
    blog(
        title,
        short_description,
        long_description,
        published_date,
        published_by,
        category
    )
VALUES
    (
        'Bien manger',
        'C''est important de bien savoir ce que l''ont manger',
        'C''est important de bien savoir ce que l''ont manger, C''est important de bien savoir ce que l''ont manger, C''est important de bien savoir ce que l''ont manger, C''est important de bien savoir ce que l''ont manger',
        '2022-10-12',
        'Max Marchand',
        'Alimentation'
    );

    INSERT INTO
    employee_schedule(
		employee_id,
        title,
        "start",
        "end",
        background_color
    )
VALUES
    (1, 'Disponible', '2023-12-12T08:00:00+0', '2023-12-12T18:00:00+0', '#32cd32'),
    (1, 'Disponible', '2023-12-13T08:00:00+0', '2023-12-13T18:00:00+0', '#32cd32'),
    (1, 'Disponible', '2023-12-14T12:00:00+0', '2023-12-14T18:00:00+0', '#32cd32'),
    (1, 'Disponible', '2023-12-15T08:00:00+0', '2023-12-15T13:00:00+0', '#32cd32'),
    ;

    INSERT INTO 
    appointment(
	 client_id, 
     employee_id, 
     service_id, 
     "start", 
     "end", 
     reason, 
     want_insurance_receipt, 
     appointment_status_name, 
     is_paid, 
     paid_amount, 
     paid_method)
	VALUES (1, 1, 1, '2023-12-13 13:00:00', '2023-12-13 14:00:00', 'mal jambe', true, 'Confirmé', false, 0, 'Aucun');