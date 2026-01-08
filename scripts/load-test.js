/**
 * OpSkl Platform - Load Testing Script
 * Generates 100,000 test cases to validate system performance
 * 
 * Usage: node scripts/load-test.js
 */

import { createClient } from '@supabase/supabase-js';
import { faker } from '@faker-js/faker';

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''; // Use service role for bulk operations
const BATCH_SIZE = 1000; // Insert in batches to avoid timeouts
const TOTAL_USERS = 100000;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Test data generators
const generateProfile = (index) => {
    const role = index % 2 === 0 ? 'provider' : 'client';
    const skills = faker.helpers.arrayElements([
        'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript',
        'UI/UX Design', 'Data Science', 'DevOps', 'Mobile Development',
        'Blockchain', 'AI/ML', 'Cloud Computing', 'Cybersecurity'
    ], faker.number.int({ min: 2, max: 6 }));

    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        title: faker.person.jobTitle(),
        bio: faker.lorem.paragraph(),
        avatar: faker.image.avatar(),
        skills,
        xp: faker.number.int({ min: 0, max: 10000 }),
        rating: parseFloat(faker.number.float({ min: 3.5, max: 5.0, precision: 0.1 }).toFixed(2)),
        verified: faker.datatype.boolean({ probability: 0.7 }),
        location: faker.location.city() + ', India',
        role,
        balance: faker.number.int({ min: 0, max: 50000 }),
        created_at: faker.date.past({ years: 2 }).toISOString()
    };
};

const generateGig = (clientIds) => {
    const categories = ['Web Development', 'Mobile App', 'Design', 'Data Science', 'Marketing', 'Writing', 'Video Editing'];
    const budgetMin = faker.number.int({ min: 5000, max: 50000 });
    const budgetMax = budgetMin + faker.number.int({ min: 10000, max: 100000 });

    return {
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraphs(3),
        category: faker.helpers.arrayElement(categories),
        budget_min: budgetMin,
        budget_max: budgetMax,
        skills: faker.helpers.arrayElements([
            'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript',
            'Figma', 'Adobe XD', 'TensorFlow', 'AWS', 'Docker'
        ], faker.number.int({ min: 2, max: 5 })),
        location: faker.location.city() + ', India',
        client_id: faker.helpers.arrayElement(clientIds),
        status: faker.helpers.arrayElement(['open', 'in_progress', 'completed']),
        created_at: faker.date.recent({ days: 90 }).toISOString()
    };
};

const generateMessage = (userIds) => {
    const sender = faker.helpers.arrayElement(userIds);
    let receiver = faker.helpers.arrayElement(userIds);
    while (receiver === sender) {
        receiver = faker.helpers.arrayElement(userIds);
    }

    return {
        sender_id: sender,
        receiver_id: receiver,
        content: faker.lorem.sentence(),
        is_read: faker.datatype.boolean({ probability: 0.6 }),
        created_at: faker.date.recent({ days: 30 }).toISOString()
    };
};

const generateTransaction = (userIds) => {
    const types = ['deposit', 'withdrawal', 'escrow_hold', 'escrow_release'];
    const statuses = ['completed', 'pending', 'failed'];

    return {
        user_id: faker.helpers.arrayElement(userIds),
        type: faker.helpers.arrayElement(types),
        amount: parseFloat(faker.number.float({ min: 100, max: 50000, precision: 0.01 }).toFixed(2)),
        status: faker.helpers.weightedArrayElement([
            { weight: 8, value: 'completed' },
            { weight: 1, value: 'pending' },
            { weight: 1, value: 'failed' }
        ]),
        metadata: {
            payment_method: faker.helpers.arrayElement(['UPI', 'Card', 'NetBanking']),
            order_id: faker.string.alphanumeric(16)
        },
        created_at: faker.date.recent({ days: 60 }).toISOString()
    };
};

// Batch insert function
async function batchInsert(table, data, batchSize = BATCH_SIZE) {
    const totalBatches = Math.ceil(data.length / batchSize);
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < totalBatches; i++) {
        const batch = data.slice(i * batchSize, (i + 1) * batchSize);

        try {
            const { error } = await supabase.from(table).insert(batch);

            if (error) {
                console.error(`❌ Batch ${i + 1}/${totalBatches} failed for ${table}:`, error.message);
                errorCount += batch.length;
            } else {
                successCount += batch.length;
                console.log(`✅ Batch ${i + 1}/${totalBatches} inserted into ${table} (${successCount}/${data.length})`);
            }
        } catch (err) {
            console.error(`❌ Exception in batch ${i + 1}:`, err);
            errorCount += batch.length;
        }

        // Rate limiting - wait 100ms between batches
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    return { successCount, errorCount };
};

// Main load test execution
async function runLoadTest() {
    console.log('🚀 OpSkl Load Test - Generating 100,000 Test Cases\n');
    console.log('⚠️  WARNING: This will insert massive amounts of data into your database!');
    console.log('⚠️  Only run this on a TEST/STAGING environment, NOT production!\n');

    const startTime = Date.now();

    try {
        // Step 1: Generate Profiles (50k providers, 50k clients)
        console.log('\n📊 Step 1/4: Generating 100,000 user profiles...');
        const profiles = Array.from({ length: TOTAL_USERS }, (_, i) => generateProfile(i));
        const profileResult = await batchInsert('profiles', profiles);
        console.log(`✅ Profiles: ${profileResult.successCount} inserted, ${profileResult.errorCount} failed\n`);

        const userIds = profiles.map(p => p.id);
        const clientIds = profiles.filter(p => p.role === 'client').map(p => p.id);

        // Step 2: Generate Gigs (50,000 gigs from clients)
        console.log('\n📊 Step 2/4: Generating 50,000 gigs...');
        const gigs = Array.from({ length: 50000 }, () => generateGig(clientIds));
        const gigResult = await batchInsert('gigs', gigs);
        console.log(`✅ Gigs: ${gigResult.successCount} inserted, ${gigResult.errorCount} failed\n`);

        // Step 3: Generate Messages (200,000 messages)
        console.log('\n📊 Step 3/4: Generating 200,000 messages...');
        const messages = Array.from({ length: 200000 }, () => generateMessage(userIds));
        const messageResult = await batchInsert('messages', messages);
        console.log(`✅ Messages: ${messageResult.successCount} inserted, ${messageResult.errorCount} failed\n`);

        // Step 4: Generate Transactions (150,000 transactions)
        console.log('\n📊 Step 4/4: Generating 150,000 transactions...');
        const transactions = Array.from({ length: 150000 }, () => generateTransaction(userIds));
        const transactionResult = await batchInsert('transactions', transactions);
        console.log(`✅ Transactions: ${transactionResult.successCount} inserted, ${transactionResult.errorCount} failed\n`);

        // Summary
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000 / 60).toFixed(2);

        console.log('\n' + '='.repeat(60));
        console.log('🎉 LOAD TEST COMPLETE');
        console.log('='.repeat(60));
        console.log(`⏱️  Total Time: ${duration} minutes`);
        console.log(`\n📈 Results Summary:`);
        console.log(`   Profiles:     ${profileResult.successCount.toLocaleString()} / ${TOTAL_USERS.toLocaleString()}`);
        console.log(`   Gigs:         ${gigResult.successCount.toLocaleString()} / 50,000`);
        console.log(`   Messages:     ${messageResult.successCount.toLocaleString()} / 200,000`);
        console.log(`   Transactions: ${transactionResult.successCount.toLocaleString()} / 150,000`);
        console.log(`\n   TOTAL RECORDS: ${(profileResult.successCount + gigResult.successCount + messageResult.successCount + transactionResult.successCount).toLocaleString()}`);
        console.log('='.repeat(60) + '\n');

        // Performance metrics
        console.log('📊 Performance Metrics:');
        console.log(`   Records/second: ${((profileResult.successCount + gigResult.successCount + messageResult.successCount + transactionResult.successCount) / (duration * 60)).toFixed(2)}`);
        console.log(`   Average batch time: ${((endTime - startTime) / ((TOTAL_USERS + 50000 + 200000 + 150000) / BATCH_SIZE)).toFixed(2)}ms\n`);

    } catch (error) {
        console.error('❌ Load test failed:', error);
        process.exit(1);
    }
}

// Cleanup function
async function cleanupTestData() {
    console.log('🧹 Cleaning up test data...\n');

    const tables = ['transactions', 'messages', 'gigs', 'profiles'];

    for (const table of tables) {
        try {
            const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
            if (error) {
                console.error(`❌ Failed to clean ${table}:`, error.message);
            } else {
                console.log(`✅ Cleaned ${table}`);
            }
        } catch (err) {
            console.error(`❌ Exception cleaning ${table}:`, err);
        }
    }

    console.log('\n✅ Cleanup complete!\n');
}

// Query performance test
async function testQueryPerformance() {
    console.log('\n🔍 Testing Query Performance...\n');

    const queries = [
        {
            name: 'Fetch 100 profiles',
            fn: async () => {
                const start = Date.now();
                const { data, error } = await supabase.from('profiles').select('*').limit(100);
                return { duration: Date.now() - start, count: data?.length || 0, error };
            }
        },
        {
            name: 'Search gigs by skill',
            fn: async () => {
                const start = Date.now();
                const { data, error } = await supabase.from('gigs').select('*').contains('skills', ['JavaScript']).limit(50);
                return { duration: Date.now() - start, count: data?.length || 0, error };
            }
        },
        {
            name: 'Fetch messages for user',
            fn: async () => {
                const start = Date.now();
                const { data: profiles } = await supabase.from('profiles').select('id').limit(1).single();
                if (profiles) {
                    const { data, error } = await supabase.from('messages').select('*').or(`sender_id.eq.${profiles.id},receiver_id.eq.${profiles.id}`).limit(100);
                    return { duration: Date.now() - start, count: data?.length || 0, error };
                }
                return { duration: 0, count: 0, error: 'No user found' };
            }
        },
        {
            name: 'Aggregate transactions',
            fn: async () => {
                const start = Date.now();
                const { data: profiles } = await supabase.from('profiles').select('id').limit(1).single();
                if (profiles) {
                    const { data, error } = await supabase.from('transactions').select('amount').eq('user_id', profiles.id);
                    return { duration: Date.now() - start, count: data?.length || 0, error };
                }
                return { duration: 0, count: 0, error: 'No user found' };
            }
        }
    ];

    for (const query of queries) {
        const result = await query.fn();
        if (result.error) {
            console.log(`❌ ${query.name}: FAILED (${result.error})`);
        } else {
            console.log(`✅ ${query.name}: ${result.duration}ms (${result.count} records)`);
        }
    }

    console.log('\n');
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'run':
        runLoadTest();
        break;
    case 'cleanup':
        cleanupTestData();
        break;
    case 'test-queries':
        testQueryPerformance();
        break;
    case 'full':
        (async () => {
            await runLoadTest();
            await testQueryPerformance();
        })();
        break;
    default:
        console.log(`
OpSkl Load Testing Script

Usage:
  node scripts/load-test.js [command]

Commands:
  run           - Generate and insert 100k test cases
  cleanup       - Delete all test data
  test-queries  - Test query performance
  full          - Run load test + query performance test

Environment Variables Required:
  NEXT_PUBLIC_SUPABASE_URL
  SUPABASE_SERVICE_ROLE_KEY (not the anon key!)

Example:
  NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co \\
  SUPABASE_SERVICE_ROLE_KEY=eyJxxx \\
  node scripts/load-test.js run
        `);
        break;
}
