#!/bin/sh

# Fix ownership and permissions on the database file
chown -R nextjs:nodejs /app/prisma/records.db

# Start the application as the nextjs user
exec "$@"
