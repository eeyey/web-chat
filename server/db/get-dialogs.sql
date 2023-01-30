SELECT receiver_id as id
FROM messages
WHERE sender_id = $1 AND receiver_id <> $1
GROUP BY receiver_id
UNIOn
SELECT sender_id as id
FROM messages
WHERE sender_id <> $1 AND receiver_id = $1
GROUP BY sender_id